import type { Monaco } from '@monaco-editor/react';
import type { editor, languages } from 'monaco-editor';
import type { Hints } from './type';

export const setPlaceholder = (
  editor: editor.IStandaloneCodeEditor | null,
  placeholder?: string,
) => {
  if (typeof placeholder !== 'undefined') {
    editor
      ?.getContainerDomNode()
      ?.querySelector('.view-lines.monaco-mouse-cursor-text')
      ?.setAttribute('data-placeholder', placeholder);
  }
};

export const providerSuggestions = (
  monaco: Monaco,
  {
    language,
    hints,
  }: {
    language: string;
    hints: Hints;
  },
) => {
  const { Function } = monaco.languages.CompletionItemKind || {};
  const hintOptions = hints.map((item) => {
    const label = typeof item === 'string' ? item : item?.label;
    const value = typeof item === 'string' ? item : item?.value;
    const kind = typeof item === 'string' ? Function : item?.kind;
    return {
      label,
      value,
      kind,
    };
  });

  return monaco.languages.registerCompletionItemProvider(language, {
    provideCompletionItems() {
      const suggestions: languages.CompletionItem[] = [];
      hintOptions.forEach((item) => {
        const { label, value, kind } = item;
        suggestions.push({
          label, // 显示名称
          kind: kind ?? Function, // 这里Function也可以是别的值，主要用来显示不同的图标
          insertText: value, // 实际粘贴上的值
          range: undefined as any,
        });
      });
      return {
        suggestions, // 必须使用深拷贝
      };
    },
    triggerCharacters: ['$', '.', '='], // 触发提示的字符，可以写多个
  });
};
