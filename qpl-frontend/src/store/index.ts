import { createStore } from 'vuex'
import user from './user';
import editor, { EditorProps } from './editor';
import templates, { TemplateProps } from './templates';

export interface ActionPayload {
  urlParams?: { [key: string]: any };
  data?: any;
  searchParams?: { [key: string]: any };
}

export interface UserProps {
  isLogin: boolean;
  userName?: string;
}

export interface GlobalDataProps {
  user: UserProps;
  templates: TemplateProps[],
  editor: EditorProps
}

const testData: any[] = [];

const store = createStore({
  modules: {
    user,
    editor,
    templates
  }
})

export default store;
