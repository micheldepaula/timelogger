import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Application from './app/App'
import Wrapper from './app/components/Wrapper/Wrapper'

ReactDOM.render(
  <Wrapper>
    <Application />
  </Wrapper>,
  document.getElementById('root'),
)
