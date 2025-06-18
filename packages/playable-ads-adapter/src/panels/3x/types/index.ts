
import { IPanelThis } from "~types/index";
import { IBuildTaskOption } from "~types/packages/builder/@types";

export const PACKAGE_NAME = 'playable-ads-adapter';
export type TAdapterRCKeys = keyof TAdapterRC;

// 排除 exportChannels 和 injectOptions 的类型
export type TAdapterRCKeysExcluded = Exclude<TAdapterRCKeys, 'exportChannels' | 'injectOptions'>;

export interface ITaskOptions extends IBuildTaskOption {
	packages: {
		[PACKAGE_NAME]: TAdapterRC;
	};
}


export interface ICustomPanelThis extends IPanelThis {
	options: ITaskOptions;
	$: TCustomPanelElements;
}

export type TCustomPanelElements = TPanelElements & {
	[key in TAdapterRCKeysExcluded]: HTMLCustomElement;
};

export type HTMLCustomElement<T extends {} = Record<string, any>> = HTMLElement & T;

export type TSelector<K extends string = string> = {
    // 允许指定类型的键（可选的）
    [key in K]?: string
} & {
    // 同时允许任意字符串键，提供更大的灵活性
    [key: string]: string;
};

export type TPanelSelector<K extends string = string> = TSelector<K> & {
    root: string;
};

// 定义面板元素类型，使其更具体
export type TPanelElements = {
    root: HTMLCustomElement;
    [key: string]: HTMLCustomElement;
};