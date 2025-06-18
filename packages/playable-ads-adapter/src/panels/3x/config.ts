import { TPanelSelector, TAdapterRCKeysExcluded } from "./types";

export const CHANNEL_OPTIONS: TChannel[] = ['AppLovin', 'Facebook', 'Google', 'IronSource', 'Liftoff', 'Mintegral', 'Moloco', 'Pangle', 'Rubeex', 'Tiktok', 'Unity'];
export const ORIENTATIONS: TWebOrientations[] = ['auto', 'portrait', 'landscape'];

export const IDS = {
	CONFIG_BUTTONS: 'configButtons',
	CREATE_BUTTONS: 'createButtons',
	NO_CONFIG_TIP: 'noConfigTip',
	CONFIG_PANEL: 'configPanel',
	OPEN_CONFIG: 'openConfig',
	IMPORT_CONFIG: 'importConfig',
	EXPORT_CONFIG: 'exportConfig',
	IMPORT_CONFIG_CREATE: 'importConfigCreate',
	CREATE_CONFIG: 'createConfig'
} as const;

// 事件类型
export const EVENT_TYPES = {
	CLICK: 'click',
	CHANGE: 'change',
	CONFIRM: 'confirm'
} as const;

export const STYLE = `
.channel-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 8px 0;
}
.channel-list ui-button {
    min-width: 80px;
}
.section-header {
    padding: 12px 0;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid var(--color-border);
}
`;

export const TEMPLATE = `
<div id="adapter-panel">
    <div id="${IDS.CONFIG_BUTTONS}" style="text-align: right; margin-bottom: 12px; display: none;">
        <ui-button id="${IDS.OPEN_CONFIG}">打开配置</ui-button>
        <ui-button id="${IDS.IMPORT_CONFIG}">导入配置</ui-button>
        <ui-button id="${IDS.EXPORT_CONFIG}">导出配置</ui-button>
    </div>
    <div id="${IDS.CREATE_BUTTONS}" style="text-align: right; margin-bottom: 12px;">
        <ui-button id="${IDS.IMPORT_CONFIG_CREATE}">导入配置</ui-button>
    </div>
    <div id="${IDS.NO_CONFIG_TIP}" style="display: none;">
        <div style="text-align: center; padding: 20px;">
            <div style="margin-bottom: 12px;">未检测到配置文件，请先创建配置</div>
            <ui-button id="${IDS.CREATE_CONFIG}">创建配置</ui-button>
        </div>
    </div>
    <div id="${IDS.CONFIG_PANEL}">
        <!-- 基础配置 -->
        
        <ui-prop>
            <ui-label slot="label" value="构建平台"></ui-label>
            <ui-input slot="content" id="buildPlatform" value="web-mobile"></ui-input>
        </ui-prop>
        <ui-prop>
            <ui-label slot="label" value="屏幕方向"></ui-label>
            <ui-select slot="content" id="orientation" value="auto">
                ${ORIENTATIONS.map((o) => `<option value="${o}">${o}</option>`).join('')}
            </ui-select>
        </ui-prop>
        <ui-prop>
            <ui-label slot="label" value="启用插屏"></ui-label>
            <ui-checkbox slot="content" id="enableSplash"></ui-checkbox>
        </ui-prop>
        <ui-prop>
            <ui-label slot="label" value="跳过构建"></ui-label>
            <ui-checkbox slot="content" id="skipBuild"></ui-checkbox>
        </ui-prop>
        <ui-prop>
            <ui-label slot="label" value="启用图片压缩"></ui-label>
            <ui-checkbox slot="content" id="tinify"></ui-checkbox>
        </ui-prop>
        <ui-prop>
            <ui-label slot="label" value="压缩API Key"></ui-label>
            <ui-input slot="content" id="tinifyApiKey"></ui-input>
        </ui-prop>
        <ui-prop>
            <ui-label slot="label" value="启用Pako压缩"></ui-label>
            <ui-checkbox slot="content" id="isZip"></ui-checkbox>
        </ui-prop>

        <div class="section-header">导出渠道配置</div>
        <div id="channelContainer" class="channel-list">
            ${CHANNEL_OPTIONS.map(
				(channel) => `
                <ui-button id="${channel}" class="small" type="default">${channel}</ui-button>
            `
			).join('')}
        </div>

        <div class="section-header">注入选项配置</div>
        <div id="injectOptionsContainer">
            ${CHANNEL_OPTIONS.map(
				(channel) => `
                <ui-section id="${channel}-section" header="${channel} 配置" style="display: none;">
                    <ui-prop>
                        <ui-label slot="label" value="head"></ui-label>
                        <ui-textarea slot="content" id="${channel}-head" placeholder="输入 head 注入内容"></ui-textarea>
                    </ui-prop>
                    <ui-prop>
                        <ui-label slot="label" value="body"></ui-label>
                        <ui-textarea slot="content" id="${channel}-body" placeholder="输入 body 注入内容"></ui-textarea>
                    </ui-prop>
                    <ui-prop>
                        <ui-label slot="label" value="sdkScript"></ui-label>
                        <ui-textarea slot="content" id="${channel}-sdkScript" placeholder="输入 SDK 脚本注入内容"></ui-textarea>
                    </ui-prop>
                </ui-section>
            `
			).join('')}
        </div>
    </div>
</div>
`;

export const SELECTORS: TPanelSelector<TAdapterRCKeysExcluded> = {
	root: '#adapter-panel',
	// 基本配置选择器	
	buildPlatform: '#buildPlatform',
	orientation: '#orientation',
	tinify: '#tinify',
	tinifyApiKey: '#tinifyApiKey',
	enableSplash: '#enableSplash',
	skipBuild: '#skipBuild',
	isZip: '#isZip',

	// DOM_IDS 中的选择器
	[IDS.CONFIG_BUTTONS]: `#${IDS.CONFIG_BUTTONS}`,
	[IDS.CREATE_BUTTONS]: `#${IDS.CREATE_BUTTONS}`,
	[IDS.NO_CONFIG_TIP]: `#${IDS.NO_CONFIG_TIP}`,
	[IDS.CONFIG_PANEL]: `#${IDS.CONFIG_PANEL}`,
	[IDS.OPEN_CONFIG]: `#${IDS.OPEN_CONFIG}`,
	[IDS.IMPORT_CONFIG]: `#${IDS.IMPORT_CONFIG}`,
	[IDS.EXPORT_CONFIG]: `#${IDS.EXPORT_CONFIG}`,
	[IDS.IMPORT_CONFIG_CREATE]: `#${IDS.IMPORT_CONFIG_CREATE}`,
	[IDS.CREATE_CONFIG]: `#${IDS.CREATE_CONFIG}`,

	// 渠道相关选择器
	...CHANNEL_OPTIONS.reduce(
		(acc, channel) => ({
			...acc,
			[channel]: `#${channel}`,
			[`${channel}-section`]: `#${channel}-section`,
			[`${channel}-head`]: `#${channel}-head`,
			[`${channel}-body`]: `#${channel}-body`,
			[`${channel}-sdkScript`]: `#${channel}-sdkScript`
		}),
		{}
	)
};