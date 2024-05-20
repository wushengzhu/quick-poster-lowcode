
export interface UserProps {
  isLogin: boolean;
  userName?: string;
}

export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number;
}

export interface GlobalDataProps {
  user: UserProps;
  templates: TemplateProps[]
}

const testData: any[] = [
  { id: 1, title: '海报1', isHot: true, coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', author: 'zws', copiedCount: 10 },
  { id: 2, title: '海报2', isHot: true, coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', author: 'zws', copiedCount: 10 },
  { id: 3, title: '海报3', isNew: true, coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', author: 'zws', copiedCount: 10 },
  { id: 4, title: '海报4', isHot: true, coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', author: 'zws', copiedCount: 10 },
  { id: 5, title: '海报5', isNew: true, coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', author: 'zws', copiedCount: 10 },
];



const user = {
  state: {
    templates: testData,
    user: { isLogin: true, userName: 'zws' }
  },
  mutations: {
    login(state: GlobalDataProps) {
      state.user.isLogin = true
    },
    logout(state: GlobalDataProps) {
      state.user.isLogin = false
    },
  },
  getters: {
    getTemplateById: (state: GlobalDataProps) => (id: number) => {
      return state.templates.find(t => t.id === id)
    }
  }
}

export default user