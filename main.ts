import { Plugin, ItemView, WorkspaceLeaf } from 'obsidian';
import { MUSIC_TERMS } from './data';

const VIEW_TYPE_MUSIC_TERMS = 'music-terms-view';

class MusicTermsView extends ItemView {
    private searchInput: HTMLInputElement;
    private resultsContainer: HTMLElement;

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType(): string {
        return VIEW_TYPE_MUSIC_TERMS;
    }

    getDisplayText(): string {
        return '音乐名词查询';
    }

    getIcon(): string {
        return 'languages';
    }

    async onOpen(): Promise<void> {
        const container = this.containerEl.children[1];
        container.empty();
        container.addClass('music-terms-container');

        // 标题
        const header = container.createEl('div', { cls: 'music-terms-header' });
        header.createEl('h4', { text: '音乐名词查询' });
        header.createEl('p', {
            text: '数据来源：国家教育研究院',
            cls: 'music-terms-source'
        });

        // 搜索框
        this.searchInput = container.createEl('input', {
            type: 'text',
            placeholder: '输入任何音乐名词（中文或外文）',
            cls: 'music-terms-search'
        });

        this.searchInput.addEventListener('input', () => {
            this.performSearch();
        });

        // 结果容器
        this.resultsContainer = container.createEl('div', { cls: 'music-terms-results' });

        // 初始提示
        this.showInitialHint();
    }

    private showInitialHint(): void {
        this.resultsContainer.empty();
        const hint = this.resultsContainer.createEl('div', { cls: 'music-terms-hint' });
        hint.createEl('p', { text: `共收录 ${MUSIC_TERMS.length} 条音乐名词` });
        hint.createEl('p', { text: '输入关键词开始搜索...' });
    }

    private removeAccents(str: string): string {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    private performSearch(): void {
        const query = this.searchInput.value.trim().toLowerCase();

        if (!query) {
            this.showInitialHint();
            return;
        }

        const queryNormalized = this.removeAccents(query);

        const results = MUSIC_TERMS.filter(item => {
            const termNormalized = this.removeAccents(item.term.toLowerCase());
            const meaningLower = item.meaning.toLowerCase();
            return termNormalized.includes(queryNormalized) ||
                   meaningLower.includes(query);
        });

        this.displayResults(results, query);
    }

    private displayResults(results: typeof MUSIC_TERMS, query: string): void {
        this.resultsContainer.empty();

        if (results.length === 0) {
            const noResult = this.resultsContainer.createEl('div', { cls: 'music-terms-no-result' });
            noResult.createEl('p', { text: `没有找到与「${query}」相关的结果` });
            return;
        }

        const countEl = this.resultsContainer.createEl('div', { cls: 'music-terms-count' });
        countEl.setText(`找到 ${results.length} 条结果`);

        const list = this.resultsContainer.createEl('div', { cls: 'music-terms-list' });

        // 限制显示数量以提高性能
        const displayLimit = 100;
        const displayResults = results.slice(0, displayLimit);

        for (const item of displayResults) {
            const row = list.createEl('div', { cls: 'music-terms-row' });

            const termEl = row.createEl('div', { cls: 'music-terms-term' });
            termEl.setText(item.term);

            const meaningEl = row.createEl('div', { cls: 'music-terms-meaning' });
            meaningEl.setText(item.meaning);
        }

        if (results.length > displayLimit) {
            const moreEl = this.resultsContainer.createEl('div', { cls: 'music-terms-more' });
            moreEl.setText(`还有 ${results.length - displayLimit} 条结果，请输入更精确的关键词...`);
        }
    }

    async onClose(): Promise<void> {
        // 清理
    }
}

export default class MusicTermsPlugin extends Plugin {
    async onload(): Promise<void> {
        this.registerView(
            VIEW_TYPE_MUSIC_TERMS,
            (leaf) => new MusicTermsView(leaf)
        );

        this.addRibbonIcon('languages', '音乐名词查询', () => {
            this.activateView();
        });

        this.addCommand({
            id: 'open-music-terms',
            name: '打开音乐名词查询',
            callback: () => {
                this.activateView();
            }
        });
    }

    async activateView(): Promise<void> {
        const { workspace } = this.app;

        let leaf: WorkspaceLeaf | null = null;
        const leaves = workspace.getLeavesOfType(VIEW_TYPE_MUSIC_TERMS);

        if (leaves.length > 0) {
            leaf = leaves[0];
        } else {
            leaf = workspace.getRightLeaf(false);
            if (leaf) {
                await leaf.setViewState({
                    type: VIEW_TYPE_MUSIC_TERMS,
                    active: true,
                });
            }
        }

        if (leaf) {
            workspace.revealLeaf(leaf);
        }
    }

    onunload(): void {
        // 清理
    }
}
