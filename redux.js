const { program } = require('commander');
const fs = require('fs');
const path = require('path');

const jsxBoilerPlateImport = (name, distance) => {
  return `
import React, { useEffect, useRef, useState } from "react";
import ENUM from "${distance}services/enum";
import Loading from "${distance}components/loading";
import { goodToken } from "${distance}services/token";
import notEmpty, { empty } from "${distance}services/objCheck";
import { all${name.mid}Dispatch } from "${distance}store/actions/account";
import { graphql } from "${distance}services/axiosAuth";
import { requestAccountData } from "${distance}store/graphql/account";
import { toast, ToastContainer } from "react-toastify";
import { FormClear, FormHandler } from "${distance}services/form";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "${distance}store";
  `
}


const jsxBoilerPlateHooks = (name, filename) => {
  return `
function ${filename.mid}() {
  const [loading, setLoading] = useState(false);
  const [${name.small}, set${name.mid}] = useState({});
  const mounted = useRef(null);
  const ${name.small}Redux = useSelector((state) => state.${name.small}Data);
  const http = useDispatch();
  `;
}

const jsxBoilerPlateUseEffect = (name) => {
  return `
  useEffect(() => {
    if (!mounted.current) {
      if (empty(${name.small}Redux.data)) {
        // http(graphql(request${name.mid}Data, {}, all${name.mid}Dispatch));
      } else {
        setLoading(false);
        if (${name.small}Redux.error) {
          toast.error(${name.small}Redux.errorMessage, { autoClose: 1000, theme: "colored" });
        } else {
          const data = ${name.small}Redux.data[Object.keys(${name.small}Redux.data)[0]];
          set${name.mid}(data);
        }
      }
      mounted.current = true;
    } else {
      if (${name.small}Redux.loading === ENUM.DONE) {
        setLoading(false);
        if (${name.small}Redux.error) {
          toast.error(${name.small}Redux.errorMessage, { theme: "colored" });
        } else {
          const data = ${name.small}Redux.data[Object.keys(${name.small}Redux.data)[0]];
          set${name.mid}(data);
        }
      }
    }
  }, [${name.small}Redux.data]);
  `
}

const jsxBoilerPlateForm = (name, formArray = []) => {
  return `
  const handleSubmit = (e) => {
    const data = FormHandler(e, ${JSON.stringify(formArray)});
    // http(graphql(request${name.mid}Data, data, all${name.mid}Dispatch));
    setLoading(true);
  };
  `;
}
const jsxBoilerPlateRender = (filename) => {
  return `
  return loading ? <Loading /> : <div className="${filename.small}">${filename.mid}</div>;
}
  `;
}

const jsxBoilerPlateServer = () => {
  return `
  export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
      async ({ req, res }) => {
        const isGood = await goodToken(req, res);
        if (!isGood) {
          return {
            redirect: {
              permanent: false,
              destination: "/home",
            },
            props: {},
          };
        } else {
          return {
            props: {}
          }
        }
      }
  );
  `;
}

const jsxBoilerPlateExport = (name) => {
  return `
export default ${name.mid};
  `;
}

const storeIndexPathOne = `
import { legacy_createStore, applyMiddleware, AnyAction, combineReducers, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import type { } from 'redux-thunk/extend-redux'
import { EqualityFn, useSelector } from 'react-redux';
`;

const storeIndexPathTwo = `
const appReducer = combineReducers({
`;
const storeIndexPathThree = `
});

export type State = ReturnType<typeof appReducer>

const rootReducer = (state: State, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case 'RESET_APP':
      state = undefined as any;
  }
  return appReducer(state, action);
};

const middleware = compose(applyMiddleware(thunkMiddleware));
// @ts-ignore
const makeStore = () => legacy_createStore(rootReducer, middleware);
export const wrapper = createWrapper<Store<any>>(makeStore, { debug: false });

export const useAppSelector: <TState = State, Selected = unknown>(selector: (state: TState) => Selected, equalityFn?: EqualityFn<Selected> | undefined) => Selected = useSelector
`;

const actionSample = (name) => {
  name = stringTrans(name);
  return `
import { AnyAction, Dispatch } from "redux";
import ENUM from "../../services/enum";
export const ${name.small}DataRequest = () => ({ type: ENUM.${name.big}_DATA_REQUEST });
export const ${name.small}DataSuccess = (${name.small}Data: any) => ({ type: ENUM.${name.big}_DATA_SUCCESS, payload: ${name.small}Data });
export const ${name.small}DataFailure = (error: any) => ({ type: ENUM.${name.big}_DATA_FAILURE, payload: error });

export const reset${name.mid}Data = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: ENUM.RESET_${name.big}_DATA });
  }

export const ${name.small}Available = (data: any) => async (dispatch: Dispatch<AnyAction>) => {
  dispatch(${name.small}DataSuccess(data));
}

export const all${name.mid}Dispatch = [${name.small}DataRequest, ${name.small}DataSuccess, ${name.small}DataFailure];
`
};

const hookSample = (name) => {
  name = stringTrans(name);
  return `
import { useEffect } from "react";
import { useAppSelector } from "..";
import { useDispatch } from "react-redux";
import { graphqlAuth } from "../../services/axiosAuth";
import { all${name.mid}Dispatch, ${name.small}DataSuccess } from "../actions/${name.small}";

const use${name.mid} = ({auto = true, auth = false}) => {
  const http = useDispatch()
  const ${name.small}Data = useAppSelector((state) => state.${name.small})

  useEffect(() => {
      if (${name.small}Data.loading === 'false' && ${name.small}Data.data === null) {
          if (auto) http(graphqlAuth('', {}, all${name.mid}Dispatch), auth)
      }
  }, [${name.small}Data, http, auto, auth]);

  const update${name.mid} = (data: RequestHookType<{[key: string]: any}>) => {
      http(${name.small}DataSuccess(data))
  }

  return { ...${name.small}Data, update${name.mid} };
}

export default use${name.mid};
`;
}

const reducerSample = (name) => {
  name = stringTrans(name);
  return `
import { AnyAction } from "redux";
import ENUM from "../../services/enum";

export interface ${name.mid}Data {
  id?: number
}

const initialState: RequestHookType<${name.mid}Data> = {
  loading: ENUM.FALSE,
  error: false,
  errorMessage: '',
  data: null,
};

const ${name.small} = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ENUM.${name.big}_DATA_REQUEST:
      return {
        ...state,
        loading: ENUM.TRUE
      };
    case ENUM.${name.big}_DATA_SUCCESS:
      return {
        error: false,
        errorMessage: '',
        data: action.payload as ${name.mid}Data,
        loading: ENUM.DONE
     };
    case ENUM.${name.big}_DATA_FAILURE:
      return {
        ...state,
        loading: ENUM.DONE,
        error: true,
        errorMessage: action.payload as string
      };
      default:
      return state;
  }
};
export default ${name.small};
`;
}


/**
 * @param  {string} string => 
 * {small:"name",big:"NAME",mid:"Name"}
 */
const stringTrans = (string) => {
  return {
    small: string.toLowerCase(),
    big: string.toUpperCase(),
    mid: string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
}

const readFile = (filename, directory = __dirname) => {
  return fs.readFileSync(path.join(directory, filename), 'utf-8', (err, data) => data)
}

const readFilesInDir = (storePath) => {
  return fs.readdirSync(storePath, { withFileTypes: true })
    .filter(item => !item.isDirectory())
    .map(item => path.parse(item.name).name);
}


const generateReduxImport = (name, filesArray, del = false) => {
  let importData = ``;
  let objData = ``;
  for (let i = 0; i < filesArray.length; i++) {
    const data = filesArray[i];
    importData += `import ${data} from './reducers/${data}';
`;
    objData += `  ${data},
`;
  }
  if (!del) {
    importData += `import ${name} from './reducers/${name}';
`;
    objData += `  ${name}, `;
  }

  return {
    imports: importData,
    objects: objData
  };
}

const createEnumString = (name) => {
  return `
  ${name}_DATA_REQUEST: "${name}_DATA_REQUEST",
  ${name}_DATA_SUCCESS: "${name}_DATA_SUCCESS",
  RESET_${name}_DATA: "RESET_${name}_DATA",
  ${name}_DATA_FAILURE: "${name}_DATA_FAILURE", `;
}

const deleteSelector = (name = '', storePath) => {
  name = name.toLowerCase();
  if (!pathExist(`${storePath}/store/actions/${name}.ts`)) {
    return console.log(`
%c"${name}" %cdoes not exist in path ${storePath}/store/actions
%c"${name}" %cdoes not exist in path ${storePath}/store/reducers
  `, 'color: red', 'color: inherit', 'color: red', 'color: inherit');
  } else {
    console.log(`
  %c...deleting ${name} %cfrom selectors`, 'color: red', 'color:inherit');
    fs.unlinkSync(`${storePath}/store/actions/${name}.ts`);
    fs.unlinkSync(`${storePath}/store/reducers/${name}.ts`);
    try {
      fs.unlinkSync(`${storePath}/store/hooks/${name}.ts`);
    } catch (e) { }
    console.log(`  %csuccessfully deleted ${name} in ${storePath}/store/actions/
  %csuccessfully deleted ${name} in ${storePath}/store/reducers/
   `, 'color:green', 'color:green');
    const files = readFilesInDir(`${storePath}/store/actions`);
    const index = files.indexOf("index");
    if (index > -1) {
      files.splice(index, 1);
    }
    const reduxIndexData = generateReduxImport(name, files, true);
    fs.writeFile(`${storePath}/store/index.ts`,
      storeIndexPathOne + reduxIndexData.imports + storeIndexPathTwo + reduxIndexData.objects + storeIndexPathThree
      , () => { })
    handleEnum(name, storePath, true);
  }
}

const generateSelector = (name = '', storePath) => {
  name = name.toLowerCase();
  let files;
  try {
    files = readFilesInDir(`${storePath}/store/actions`);
  } catch (error) {
    console.error(error.message)
    console.log("%c...creating directory", 'color:green')
    generateReduxFolder(storePath);
    files = readFilesInDir(`${storePath}/store/actions`);
  }
  const index = files.indexOf("index");
  if (index > -1) {
    files.splice(index, 1);
  }

  if (files.includes(name)) {
    return console.error(`
  This selector aready exist, please try using another name
  `)
  }

  const reduxIndexData = generateReduxImport(name, files);

  fs.writeFile(`${storePath}/store/actions/${name}.ts`,
    actionSample(name)
    , () => { })

  fs.writeFile(`${storePath}/store/reducers/${name}.ts`,
    reducerSample(name)
    , () => { });

  fs.writeFile(`${storePath}/store/hooks/${name}.ts`,
    hookSample(name)
    , () => { });

  fs.writeFile(`${storePath}/store/index.ts`,
    storeIndexPathOne + reduxIndexData.imports + storeIndexPathTwo + reduxIndexData.objects + storeIndexPathThree
    , () => { })

  handleEnum(name, storePath);
  console.log(`  %c...adding enum to ${storePath}/services/enum.ts`, 'color: green')
  console.log(`  %successfully created action and reducer for ${name}
  `, 'color:green')
}

const handleEnum = (name, storePath, del = false) => {
  name = name.toUpperCase();
  const enumString = createEnumString(name);
  let enums = '';
  let stringArr;
  if (pathExist(`${storePath}/services/enum.ts`)) {
    if (!del) {
      stringArr = readFile("enum.ts", './src/services').split("({");
      enums = stringArr[0] + '({' + enumString + stringArr[1];
    } else {
      stringArr = readFile("enum.ts", './src/services').split(enumString);
      enums = stringArr[0] + stringArr[1];
    }
  } else {
    fs.mkdirSync(`${storePath}/services`);
    enums = `import { getAccessToken, getRefreshToken } from "./token";

const ENUM = Object.freeze({${!del && enumString}
});
export default ENUM;`;
  }

  fs.writeFile(`${storePath}/services/enum.ts`,
    enums
    , () => { })

  if (del) {
    console.log(`  %c...deleting ${name.toLowerCase()} from enum
  %csuccessfully deleted ${name.toLowerCase()} from enum
  `, 'color:red', 'color:green')
  } else {
    console.log(`
  %ccreated enum for ${name.toLowerCase()}`, 'color:green')
  }
}

const generateReduxFolder = (rootPath) => {
  const storePath = `${rootPath}/store`;
  if (!pathExist(storePath)) {
    fs.mkdirSync(storePath);
  } else {
    return console.error(`
  store already exist in path ${rootPath}
  `);
  }
  if (!pathExist(`${storePath}/index.ts`)) {
    fs.writeFile(`${storePath}/index.ts`,
      storeIndexPathOne + storeIndexPathTwo + storeIndexPathThree
      , () => { })
  }
  if (!pathExist(`${storePath}/actions`)) {
    fs.mkdirSync(`${storePath}/actions`);
  }
  if (!pathExist(`${storePath}/reducers`)) {
    fs.mkdirSync(`${storePath}/reducers`);
  }
  console.log(`
  %csuccessfully created store in ${rootPath}
 `, 'color:green');
}
const pathExist = (filename) => fs.existsSync(path.join(__dirname, filename));

const handleReduxInFIle = (dirBreak, name, server = "", form = "") => {
  const rootPath = dirBreak;
  dirBreak = dirBreak.split("/");
  const file = dirBreak[dirBreak.length - 1];
  let filename;
  if (path.parse(file).name === 'index') {
    filename = stringTrans(dirBreak[dirBreak.length - 2])
  } else {
    filename = stringTrans(path.parse(file).name);
  }
  const folderDir = dirBreak.slice(0, -1).join('/');
  dirBreak.shift();
  const pageDistance = dirBreak.indexOf("pages");
  let pathDistance = dirBreak.length - 1 - pageDistance;
  let distanceString = '../'.repeat(pathDistance);
  name = stringTrans(name);

  if (pathExist(rootPath)) {
    return console.error(`
  ${file} already exist at ${folderDir}/
   `)
  }
  if (!pathExist(folderDir)) {
    console.log(`
  %c...creating directory ${folderDir}
          `, 'color:green')
    fs.mkdirSync(folderDir);
  }
  if (form) {
    form = jsxBoilerPlateForm(name, form.split(','))
  }
  if (server) {
    server = jsxBoilerPlateServer();
  }
  fs.writeFile(rootPath,
    jsxBoilerPlateImport(name, distanceString) +
    jsxBoilerPlateHooks(name, filename) +
    jsxBoilerPlateUseEffect(name) +
    form +
    jsxBoilerPlateRender(filename) +
    server +
    jsxBoilerPlateExport(filename)
    , () => { })
  console.log(`  redux boiler plate creation complete
  directory ${rootPath}
      `)

}


program.command("include")
  .argument('<name>', 'name of selector to include in file')
  .option('--server', 'include server function and import')
  .option('-f, --form <FieldList>', 'comma seperated form fields')
  .option('-p, --path <RootDirectory>', 'full path to react file, default is ./src/pages/index.tsx')
  .action((name, options) => {
    const pathDir = options.path ? options.path : './src/pages/index.tsx';
    handleReduxInFIle(pathDir, name, options.server, options.form)
  })

program.command('delete')
  .option('-s, --selector <name>', 'delete actions, reducer and enum of selector in store')
  .option('-p, --path <RootDirectory>', 'root directory to store, default is ./src')
  .action((options) => {
    const pathDir = options.path ? options.path : './src';
    if (options.selector) {
      deleteSelector(options.selector, pathDir)
    } else {
      console.log(`
  node <command_file> delete -h    for quick help on <command_file>    
      `)
    }
  });

program.command('create')
  .description('autogenerate redux boilerplate files')
  .option('--store', 'create redux store boilerplate')
  .option('-s, --selector <name>', 'create actions and reducer files and update enum.ts')
  .option('-p, --path <RootDirectory>', 'root directory to store, default is ./src')
  .action((options) => {
    const pathDir = options.path ? options.path : './src';
    if (options.store) {
      generateReduxFolder(pathDir);
    }
    if (options.selector) {
      generateSelector(options.selector, pathDir);
    }
    if (!options.store && !options.selector) {
      console.log(`
  node <command_file> create -h    for quick help on <command_file>    
      `)
    }
  });

program.parse(); 