"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ease } from "@/lib/motion";

/**
 * Acordeón accesible: cada pregunta es un botón real con aria-expanded y
 * aria-controls (Enter/Espacio nativos). Solo una abierta a la vez; la primera
 * abierta por defecto. Las respuestas siguen en el DOM (inert si están
 * cerradas) para SEO. La altura se anima con motion (~300 ms).
 * Las preguntas van en grupos con subtítulo (h3) y numeración continua.
 */
type Faq = { question: string; answer: string; bullets?: readonly string[] };
type FaqGroup = { title: string; items: readonly Faq[] };

export function FaqAccordion({ groups }: { groups: readonly FaqGroup[] }) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.3, ease };

  // Índice continuo (01, 02…) a través de los grupos.
  let counter = 0;
  const numbered = groups.map((group) => ({
    ...group,
    items: group.items.map((faq) => ({ ...faq, index: counter++ })),
  }));

  return (
    <div className="space-y-12">
      {numbered.map((group) => (
        <RevealGroup key={group.title}>
          <RevealItem>
            <h3 className="mb-2 font-heading text-h3 font-extrabold text-primary-dark">{group.title}</h3>
          </RevealItem>
          <div className="border-t border-line">
            {group.items.map((faq) => {
              const i = faq.index;
              const isOpen = open === i;
              const buttonId = `${id}-q${i}`;
              const panelId = `${id}-a${i}`;
              return (
                <RevealItem key={faq.question} className="relative border-b border-line">
                  {/* Barra vertical de la pregunta abierta */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute top-4 bottom-4 left-0 w-0.5 origin-top rounded-full bg-complement"
                    initial={false}
                    animate={{ scaleY: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
                    transition={transition}
                  />
                  <h4>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group/faq flex min-h-14 w-full items-center gap-4 rounded-control py-5 pl-4 text-left"
                    >
                      <span className="flex flex-1 items-baseline gap-4 transition-transform duration-300 ease-brand group-hover/faq:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/faq:translate-x-0">
                        <span className="w-8 shrink-0 text-sm font-semibold text-primary/50 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-lg leading-snug font-semibold transition-colors duration-150 ease-brand ${
                            isOpen ? "text-primary" : "text-ink group-hover/faq:text-primary-dark"
                          }`}
                        >
                          {faq.question}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-150 ease-brand ${
                          isOpen
                            ? "bg-primary text-white"
                            : "bg-tint text-ink-muted group-hover/faq:bg-secondary-hover group-hover/faq:text-primary"
                        }`}
                      >
                        {/* + que rota a × */}
                        <PlusIcon
                          strokeWidth={1.5}
                          className={`size-5 transition-transform duration-300 ease-brand motion-reduce:transition-none ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        />
                      </span>
                    </button>
                  </h4>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!isOpen}
                    className="overflow-hidden"
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    transition={transition}
                  >
                    <motion.div
                      className="max-w-prose pr-14 pb-6 pl-16 text-ink-muted"
                      initial={false}
                      animate={{ opacity: isOpen ? 1 : 0 }}
                      transition={{ ...transition, delay: isOpen && !reduceMotion ? 0.08 : 0 }}
                    >
                      <p>{faq.answer}</p>
                      {faq.bullets && (
                        <ul className="mt-3 space-y-2">
                          {faq.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3">
                              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/50" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </motion.div>
                </RevealItem>
              );
            })}
          </div>
        </RevealGroup>
      ))}
    </div>
  );
}
