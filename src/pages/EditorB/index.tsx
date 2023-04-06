import CodeEditorB from '@/pages/components/CodeEditorB';

export default (props: any) => {
  return (
    <>
      <p>EditorA based on @monaco-editor/react</p>
      <CodeEditorB height={300} width={500}></CodeEditorB>
    </>
  );
};
