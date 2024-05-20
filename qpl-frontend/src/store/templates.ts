
import { GlobalDataProps } from ".";
import { PageData } from "./editor";

// Required<>: 类型操作符用于将一个类型中的所有可选属性（即那些被标记为?的属性）变为必需的。
// 换句话说，Required<T>会生成一个新的类型，其中T的所有属性都是必填的
// Omit<T, K> 表示从类型T中移除键K。
// export type TemplateProps = Required<Omit<PageData, 'props' | 'setting'>>

export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number;
  isHot?: boolean;
  isNew?: boolean;
  uuid?: string;
}

const testData: TemplateProps[] = [
  { id: 1, title: '海报1', isHot: true, coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', author: 'zws', copiedCount: 10 },
  { id: 2, title: '海报2', isHot: true, coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', author: 'zws', copiedCount: 10 },
  { id: 3, title: '海报3', isNew: true, coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', author: 'zws', copiedCount: 10 },
  { id: 4, title: '海报4', isHot: true, coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', author: 'zws', copiedCount: 10 },
  { id: 5, title: '海报5', isNew: true, coverImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', author: 'zws', copiedCount: 10 },
]

export interface TemplatesProps {
  data: PageData[]
}

const templates = {
  state: {
    data: testData
  },
  getters: {
    getTemplateById: (state: GlobalDataProps) => (id: number) => {
      return state.templates.find(t => t.id === id)
    }
  }
}

export default templates