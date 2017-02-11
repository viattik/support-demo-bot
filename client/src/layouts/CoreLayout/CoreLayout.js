import React from 'react'
import Header from '../../components/Header'
import ChatList from '../../components/ChatList/ChatList'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-4">
          <ChatList />
        </div>
        <div className="col-xs-8">
          <div className='core-layout__viewport'>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout