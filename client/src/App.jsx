import './App.css'
import Menu from './components/Menu'
import Main from './components/main/Main'
import { useSelector} from 'react-redux'

function App({type}) {
  const lightMode = useSelector((state) => state.mode.value)
  return (
   <div className={`flex relative ${ lightMode? "bg-white" : "bg-black"} w-screen`}>
        <Menu />
        <Main type={type}/>
   </div>
  )
}

export default App
