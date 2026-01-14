# Email Previewer

![screenshot](/public/screenshot.png)

This is a NextJS project (with TypeScript and TailwindCSS) which is an email template editor using [react.email](https://react.email) to render UI primitives as well as the output processed HTML code.

## The Gist

1. The idea was to implement an industry standard editor that can be easily extended as needed and provide a familiar feel - hence the choice of [Monaco Editor](https://microsoft.github.io/monaco-editor/).
2. The UI is very simple, but allows for resizing the panes vertically, as it has a horizontal splitter.
3. The rendering pipeline uses the [render()](https://react.email/docs/utilities/render) method of [react.email](https://react.email) to generate a unified, inlined source than can be then displayed in the right pane.

## EmailEditor

- The editor uses a typical instance of [Monaco Editor](https://microsoft.github.io/monaco-editor/) with a sample code loaded into the buffer.
- Linting errors are supressed for the purpose of the app, as they are not deemed essential for the user experience.
- The code changes are reflected live in the preview pipeline.

## EmailPreview

- The Preview supports both `HTML` and `Plain Text` mode, toggled via tabs.
- This component runs a side-effect hook that kick starts the rendering pipeline once the `code` prop changes.
- The pipeline consists of a few steps:
  1. First, the code is transpiled from TSX to JavaScript source code text using [sucrase](https://sucrase.io/).
  2. Then, the code is executed, defined as a component and exported. The `new Function()` essentially wraps the export into an anonymous function scope with required params (i.e. `React`).
  3. Finally, the [render()](https://react.email/docs/utilities/render) method uses the generated `<EmailComponent>` to render the HTML which is then displayed in an `<iframe>`. For plain text, `toPlainText()` is used.
  4. There is a simple error support; in case of transpilation errors a message will be displayed in the right pane.
  5. **Important**: Because all the dependencies are defined within the preview pipeline (i.e. `@react-email/components`, user is able to use only the libraries provided in the sample code visible by default).
