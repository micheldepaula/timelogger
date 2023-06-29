import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store'

interface WrapperProps {
  children: JSX.Element | JSX.Element[]
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default Wrapper
