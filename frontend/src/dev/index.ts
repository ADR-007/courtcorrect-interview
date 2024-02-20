import { useInitial } from './useInitial';


async function loadModuleIfExists(moduleName: string) {
  try {
    return await import(moduleName);
  } catch (error) {
    console.error(`Failed to load module ${moduleName}`, error);
    return null;
  }
}

const ComponentPreviews = await loadModuleIfExists('.preview');


export {
    ComponentPreviews,
    useInitial
};