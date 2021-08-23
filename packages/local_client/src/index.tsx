import ReactDOM from 'react-dom'
// import CodeCell from './components/code_cell'
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Provider } from 'react-redux'
import { store } from './state'
import CellList from './components/cell_list'
export const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
