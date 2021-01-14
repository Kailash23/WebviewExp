import React, {useRef} from 'react';
import {WebView} from 'react-native-webview';

const INITIAL_VAL = 0;

export default function App() {
  const webview = useRef();

  const script = (data) => `
      window.ReactNativeWebView.postMessage(${+data + 1})
      true; 
    `;

  function reply(data) {
    console.log(data);
    setTimeout(() => {
      webview.current.injectJavaScript(script(data));
    }, 1000);
  }

  return (
    <WebView
      ref={webview}
      source={{uri: 'https://google.com/'}}
      onMessage={(event) => {
        reply(event.nativeEvent.data);
      }}
      injectedJavaScript={script(INITIAL_VAL)}
    />
  );
}
