export const buildFuncCall = (
  funcName: string,
  argsNames: string[],
  argValues: any[]
): {
  signature: string,
  variables: any
} => {

  let variables: any = {};

  for(let i = 0; i < argsNames.length; i++) {
    variables[argsNames[i]] = argValues[i];
  }

  return {
    signature: `${funcName}(${argsNames.map((x, i) => `${x}: $${x}`).join(',')})`,
    variables
  };
};
