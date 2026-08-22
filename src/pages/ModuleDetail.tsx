import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getAdjacentModules, getModule, modules } from '@/data/modules';
import type { ContentBlock } from '@/data/types';
import { APPROVAL_SCORE, MAX_SCORE, miningPillars } from '@/data/tools';
import { hookKindOrder, hookKinds } from '@/data/hooks';
import { useProgress } from '@/hooks/useProgress';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { PlaceholderBlock } from '@/components/ui/PlaceholderBlock';
import { TaskCheck } from '@/components/ui/TaskCheck';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import styles from './ModuleDetail.module.css';

export function ModuleDetail() {
  const { moduleId = '' } = useParams();
  const module = getModule(moduleId);
  const { isModuleDone, toggleModule, isTaskDone, toggleTask } = useProgress();
  const [coverFailed, setCoverFailed] = useState(false);
  const { toast } = useToast();

  /* rota inválida volta para a lista em vez de mostrar tela quebrada */
  if (!module) return <Navigate to="/modulos" replace />;

  const done = isModuleDone(module.id);
  const { previous, next } = getAdjacentModules(module.id);
  const index = modules.findIndex((m) => m.id === module.id) + 1;

  return (
    <div className={`page ${styles.page}`}>
      <div className={styles.layout}>
        <article className={styles.main}>
          {/*
            A capa só aparece se o arquivo existir. Sem ela, a tela fica como
            sempre foi — nada de moldura vazia esperando uma imagem que talvez
            nunca chegue. Ver public/modulos/LEIA-ME.md.
          */}
          {module.cover && !coverFailed && (
            <div className={styles.cover}>
              <img
                src={`${import.meta.env.BASE_URL}modulos/${module.cover}`}
                alt=""
                loading="lazy"
                decoding="async"
                onError={() => setCoverFailed(true)}
              />
            </div>
          )}

          <header className={styles.head}>
            <Button to="/modulos" variant="quiet" size="sm" icon="arrowLeft">
              Todos os módulos
            </Button>

            <p className={`mono ${styles.kicker}`}>
              Módulo {module.number}
              <span className={styles.pos}>
                {index} de {modules.length}
              </span>
            </p>

            <h1>{module.title}</h1>
            <p className={styles.summary}>{module.summary}</p>

            {module.audio && (
              <div className={styles.audio}>
                <AudioPlayer file={module.audio} title={module.title} />
              </div>
            )}
          </header>

          <div className={styles.blocks}>
            {module.blocks.map((block) => {
              if (block.kind === 'placeholder') {
                return (
                  <div id={block.id} key={block.id}>
                    <PlaceholderBlock title={block.title} outline={block.outline} />
                  </div>
                );
              }

              if (block.kind === 'callout') {
                return (
                  <aside
                    id={block.id}
                    key={block.id}
                    className={[styles.callout, block.tone === 'warn' ? styles.warn : '']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <h3>{block.title}</h3>
                    <p>{block.body}</p>
                    {block.link && (
                      <Button to={block.link.to} variant='secondary' size='sm' iconRight='arrowRight'>
                        {block.link.label}
                      </Button>
                    )}
                  </aside>
                );
              }

              if (block.kind === 'heading') {
                return (
                  <header id={block.id} key={block.id} className={styles.section}>
                    <span className={`mono ${styles.sectionNum}`}>{block.number}</span>
                    <h2>{block.title}</h2>
                    {block.body && <p>{block.body}</p>}
                  </header>
                );
              }

              if (block.kind === 'cards') {
                return (
                  <section id={block.id} key={block.id} className={styles.block}>
                    <h2>{block.title}</h2>
                    {block.intro && <p>{block.intro}</p>}

                    {/*
                      Os cards mostram o texto inteiro em vez de revelarem no
                      clique. Esconder conteúdo de aula atrás de um toque cobra
                      um gesto por parágrafo e quebra a leitura corrida — a
                      interatividade aqui está em poder varrer os quatro papéis
                      de relance, não em ter que abrir cada um.
                    */}
                    <div className={styles.cards}>
                      {block.cards.map((card) => (
                        <article key={card.name} className={styles.card}>
                          <h3>{card.name}</h3>
                          <span className={`mono ${styles.cardRole}`}>{card.role}</span>
                          <p>{card.text}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              }

              if (block.kind === 'quiz') {
                return <Quiz key={block.id} block={block} />;
              }

              if (block.kind === 'diagnosis') {
                return <Diagnosis key={block.id} block={block} />;
              }

              if (block.kind === 'hooktypes') {
                return (
                  <section id={block.id} key={block.id} className={styles.block}>
                    <h2>{block.title}</h2>
                    {block.intro && <p>{block.intro}</p>}

                    {/* a taxonomia vem de hooks.ts: módulo, biblioteca de
                        ganchos e Laboratório precisam dizer a mesma coisa */}
                    <div className={styles.cards}>
                      {hookKindOrder.map((kind) => (
                        <article key={kind} className={styles.card}>
                          <h3>{kind}</h3>
                          <p>{hookKinds[kind]}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              }

              if (block.kind === 'timeline') {
                const total = block.steps.reduce((sum, step) => sum + step.seconds, 0);
                return (
                  <section id={block.id} key={block.id} className={styles.block}>
                    <h2>{block.title}</h2>
                    {block.intro && <p>{block.intro}</p>}

                    {/* a faixa mostra a proporção real: onde o tempo do vídeo vai */}
                    <div className={styles.strip} aria-hidden="true">
                      {block.steps.map((step) => (
                        <i
                          key={step.range}
                          style={{ flexGrow: step.seconds }}
                          title={`${step.range} · ${step.label}`}
                        />
                      ))}
                    </div>

                    <ol className={styles.timeline}>
                      {block.steps.map((step) => (
                        <li key={step.range}>
                          <span className={`mono ${styles.range}`}>{step.range}</span>
                          <div>
                            <h3>{step.label}</h3>
                            <p>{step.purpose}</p>
                          </div>
                        </li>
                      ))}
                    </ol>

                    <p className={styles.timelineTotal}>
                      <span className="mono">{total}s</span> no total. Passou muito disso, o vídeo
                      está longo para o que tem a dizer.
                    </p>
                  </section>
                );
              }

              if (block.kind === 'pillars') {
                return (
                  <section id={block.id} key={block.id} className={styles.block}>
                    <h2>{block.title}</h2>
                    {block.intro && <p>{block.intro}</p>}

                    {/* a régua vem de tools.ts: o módulo e a ferramenta não podem divergir */}
                    <ol className={styles.pillars}>
                      {miningPillars.map((pillar, i) => (
                        <li key={pillar.id}>
                          <div className={styles.pillarHead}>
                            <span className={`mono ${styles.pillarNum}`}>{i + 1}</span>
                            <div>
                              <h3>{pillar.name}</h3>
                              <p className={styles.pillarQuestion}>{pillar.question}</p>
                            </div>
                          </div>

                          <div className={styles.levels}>
                            {pillar.levels.map((level, note) => (
                              <p key={note}>
                                <span className={`mono ${styles.levelNum}`}>{note}</span>
                                {level}
                              </p>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ol>

                    <p className={styles.pillarsTotal}>
                      <strong>{APPROVAL_SCORE} pontos ou mais</strong> de {MAX_SCORE} e o produto
                      vale o seu tempo de gravação.
                    </p>
                  </section>
                );
              }

              if (block.kind === 'checklist') {
                return (
                  <section id={block.id} key={block.id} className={styles.block}>
                    <h2>{block.title}</h2>
                    {block.intro && <p>{block.intro}</p>}

                    {/*
                      A marcação fica salva, mas NÃO tranca a seção seguinte.
                      Conteúdo de aula já lido não se destranca; travar o que
                      vem depois só criaria um obstáculo entre o aluno e o
                      material que ele pagou para ler.
                    */}
                    <div className={styles.checklist}>
                      {block.items.map((item) => (
                        <div key={item.id} className={styles.checkItem}>
                          <TaskCheck
                            checked={isTaskDone(item.id)}
                            label={item.label}
                            onChange={() => toggleTask(item.id)}
                          />
                          <p className={styles.checkNote}>{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              if (block.kind === 'compare') {
                return (
                  <section id={block.id} key={block.id} className={styles.block}>
                    <h2>{block.title}</h2>
                    {block.intro && <p>{block.intro}</p>}

                    <div className={styles.compare}>
                      {block.columns.map((side) => (
                        <article
                          key={side.label}
                          className={[
                            styles.side,
                            side.tone === 'accent' ? styles.sideAccent : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                          <header>
                            <h3>{side.label}</h3>
                            <span className={`mono ${styles.sideNote}`}>{side.note}</span>
                          </header>

                          <dl className={styles.rows}>
                            {side.rows.map((row) => (
                              <div key={row.label}>
                                <dt>{row.label}</dt>
                                <dd>{row.value}</dd>
                              </div>
                            ))}
                          </dl>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              }

              if (block.kind === 'list') {
                return (
                  <section id={block.id} key={block.id} className={styles.block}>
                    <h2>{block.title}</h2>
                    <ul className={styles.list}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                );
              }

              return (
                <section id={block.id} key={block.id} className={styles.block}>
                  <h2>{block.title}</h2>
                  {block.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </section>
              );
            })}
          </div>

          <footer className={styles.footer}>
            <Button
              variant={done ? 'secondary' : 'primary'}
              icon={done ? undefined : 'check'}
              onClick={() => {
                toggleModule(module.id);
                if (!done) toast(`Módulo ${module.number} concluído.`);
              }}
            >
              {done ? 'Marcado como concluído' : 'Marcar módulo como concluído'}
            </Button>

            {next && (
              <Button to={`/modulos/${next.id}`} variant="secondary" iconRight="arrowRight">
                Próximo módulo
              </Button>
            )}
          </footer>

          <nav className={styles.pager}>
            {previous ? (
              <Link className={styles.pagerLink} to={`/modulos/${previous.id}`}>
                <Icon name="arrowLeft" size={15} />
                <span>
                  <em className="mono">{previous.number}</em>
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link className={`${styles.pagerLink} ${styles.pagerNext}`} to={`/modulos/${next.id}`}>
                <span>
                  <em className="mono">{next.number}</em>
                  {next.title}
                </span>
                <Icon name="arrowRight" size={15} />
              </Link>
            )}
          </nav>
        </article>

        {/* ---------- índice ---------- */}
        <aside className={styles.toc}>
          <div className={styles.tocInner}>
            <p className="eyebrow">Nesta aula</p>
            {/*
              Índice em dois níveis: seção em destaque, o resto recuado embaixo.
              Num módulo com doze blocos, uma lista plana numerada de 01 a 12 não
              mostra a estrutura da aula — mostra só que ela é longa.
            */}
            <ul className={styles.tocList}>
              {module.blocks.map((block) =>
                block.kind === 'heading' ? (
                  <li key={block.id} className={styles.tocSection}>
                    <a href={`#${block.id}`}>
                      <span className="mono">{block.number}</span>
                      {block.title}
                    </a>
                  </li>
                ) : (
                  <li key={block.id}>
                    <a href={`#${block.id}`}>{block.title}</a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Diagnóstico por sintoma
   ----------------------------------------------------------------------------
   Componente à parte porque tem estado próprio: o bloco escolhido. É o único
   bloco de módulo que reage a clique.
   --------------------------------------------------------------------------- */

function Diagnosis({ block }: { block: Extract<ContentBlock, { kind: 'diagnosis' }> }) {
  const [current, setCurrent] = useState(block.cases[0].id);
  const active = block.cases.find((item) => item.id === current) ?? block.cases[0];

  return (
    <section id={block.id} className={styles.block}>
      <h2>{block.title}</h2>
      {block.intro && <p>{block.intro}</p>}

      <div className={styles.symptoms} role="tablist" aria-label="Cenários">
        {block.cases.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={item.id === active.id}
            className={[styles.symptom, item.id === active.id ? styles.symptomOn : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => setCurrent(item.id)}
          >
            {item.symptom}
          </button>
        ))}
      </div>

      <div className={styles.diagnosisPanel}>
        <p className={styles.meaning}>{active.meaning}</p>

        <h3 className="eyebrow">O que fazer</h3>
        <ul className={styles.actions}>
          {active.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>

        {active.link && (
          <Button to={active.link.to} variant="secondary" size="sm" iconRight="arrowRight">
            {active.link.label}
          </Button>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Quiz de certo ou errado
   ----------------------------------------------------------------------------
   Responde, mostra se acertou e explica na hora. Não tranca a conclusão do
   módulo: quem errou é justamente quem precisa seguir lendo.
   --------------------------------------------------------------------------- */

function Quiz({ block }: { block: Extract<ContentBlock, { kind: 'quiz' }> }) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const answered = block.questions.filter((q) => q.id in answers);
  const right = answered.filter((q) => answers[q.id] === q.answer).length;
  const done = answered.length === block.questions.length;

  return (
    <section id={block.id} className={styles.block}>
      <h2>{block.title}</h2>
      {block.intro && <p>{block.intro}</p>}

      <ol className={styles.quiz}>
        {block.questions.map((question) => {
          const given = answers[question.id];
          const replied = question.id in answers;
          const correct = given === question.answer;

          return (
            <li key={question.id} className={styles.question}>
              <p className={styles.statement}>{question.statement}</p>

              <div className={styles.options}>
                {[true, false].map((option) => (
                  <button
                    key={String(option)}
                    disabled={replied}
                    className={[
                      styles.option,
                      replied && given === option ? styles.optionPicked : '',
                      replied && option === question.answer ? styles.optionRight : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                  >
                    {option ? 'Certo' : 'Errado'}
                  </button>
                ))}
              </div>

              {replied && (
                <p className={[styles.explain, correct ? styles.explainOk : styles.explainNo].join(' ')}>
                  <Icon name={correct ? 'check' : 'close'} size={14} />
                  <span>{question.explain}</span>
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {done && (
        <div className={styles.score}>
          <span className={`mono ${styles.scoreValue}`}>
            {right}/{block.questions.length}
          </span>
          <p>
            {right === block.questions.length
              ? 'Todas certas. Volte aqui antes de mexer em configuração de conta.'
              : 'Releia os pontos que você errou — cada um deles custa conta.'}
          </p>
          <button className={styles.retry} onClick={() => setAnswers({})}>
            Refazer
          </button>
        </div>
      )}
    </section>
  );
}
