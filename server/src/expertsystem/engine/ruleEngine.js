import { Engine } from 'json-rules-engine'

export const runRuleEngine = async ({ facts, rules }) => {
  const engine = new Engine();

  // Add all rules
  rules.forEach(rule => engine.addRule(rule));

  // Run engine
  const { events } = await engine.run(facts);


  return events;
};
