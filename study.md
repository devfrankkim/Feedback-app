### `npm i -D json-server concurrently`

- run server + react server at the same time.

```js
    "start": "react-scripts start",
    "json-server": "json-server --watch db.json --port 5000",
    "dev": "concurrently \"npm start\" \"npm run json-server\"",
```

[concurrently](https://medium.com/@joelazarz/using-concurrently-with-json-server-and-your-react-app-3d07487acc50)

### proxy

- Once you deploy, if you have a custom backend or whatever on a specific domain, you would replace this.

```js
"proxy" : "http://localhost:5000"
```

### postman

- http request 관리 해준다. 굳이 db.json가서 안지워도 됨 + 웹브라우저 체크 하지 않아도 됨.

### Default props

- default props 설정가능.

```js
// App.js
<Router>
  <Header text={"UI"} />
</Router>;

// Header.js
function Header({ text, bgColor, textColor }) {


Header.defaultProps = {
  text: "Feedback UI",
  bgColor: "rgba(0,0,0,0.4)",
  textColor: "#ff6a95",
};
```
