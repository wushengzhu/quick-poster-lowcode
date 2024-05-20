import { AllComponentProps, TextComponentProps } from '@/defaultProps';
import { v4 as uuidv4 } from 'uuid'



export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: Partial<AllComponentProps>;
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等 
  name: 'l-text' | 'l-image' | 'l-shape';
  // 图层是否隐藏
  isHidden?: boolean;
  // 图层是否锁定
  isLocked?: boolean;
  // 图层名称
  layerName?: string;
}
export type MoveDirection = 'Up' | 'Down' | 'Left' | 'Right'

export interface HistoryProps {
  id: string;
  componentId: string;
  type: 'add' | 'delete' | 'modify';
  data: any;
  index?: number;
}
export interface UpdateComponentData {
  key: keyof AllComponentProps | Array<keyof AllComponentProps>;
  value: string | string[];
  id: string;
  isRoot?: boolean;
}
export interface ChannelProps {
  id: number;
  name: string;
  workId: number;
  status: number;
}
export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
  page: PageData;
  // 当前被复制的组件
  copiedComponent?: ComponentData;
  // 当前操作的历史记录
  histories: HistoryProps[];
  // 当前历史记录的操作位置
  historyIndex: number;
  // 开始更新时的缓存值
  cachedOldValues: any;
  // 保存最多历史条目记录数
  maxHistoryNumber: number;
  // 数据是否有修改
  isDirty: boolean;
  // 当前 work 的 channels
  channels: ChannelProps[];
}
export interface PageProps {
  backgroundColor: string;
  backgroundImage: string;
  backgroundRepeat: string;
  backgroundSize: string;
  height: string;
}
export type AllFormProps = PageProps & AllComponentProps
export interface PageData {
  id?: number;
  props?: PageProps;
  title?: string;
  desc?: string;
  coverImg?: string;
  uuid?: string;
  setting?: { [key: string]: any };
  isTemplate?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  author?: string;
  copiedCount?: number;
  status?: number;
  user?: {
    gender: string;
    nickName: string;
    picture: string;
    userName: string;
  };
}

export interface EditorProps {
  components: ComponentData[];// 中间编辑器渲染的数组
  currentElement: string;
}

export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: 'l-text', props: { text: 'hello' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello2' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello3' } },
]

const editor = {
  state: {
    components: testComponents,
    currentElement: ''
  },
  mutations: {
    addComponent(state, props: Partial<TextComponentProps>) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: 'l-text',
        props
      }
      state.components.push(newComponent)
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId
    }
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find((component) => component.id === state.currentElement)
    }
  }
}

export default editor