import CodeEditorA from '../components/CodeEditorA';

export default (props: any) => {
  return (
    <>
      <p>EditorA based on react-monaco-editor</p>
      <div
        style={{
          width: 500,
          height: 300,
        }}
      >
        <CodeEditorA></CodeEditorA>
      </div>
    </>
  );
};
