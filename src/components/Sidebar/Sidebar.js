import React from 'react'
import {SidebarContainer,Icon,CloseIcon} from './Sidebar.elements'

function Sidebar() {
    return (
        <>
           <SidebarContainer>
               <Icon>
                   <CloseIcon/>
               </Icon>
               <SidebarWrapper>
                   <SidebarMenu>
                       <SidebarLink to="">Mission</SidebarLink>
                       <SidebarLink to="">RoadMap</SidebarLink>
                       <SidebarLink to="">Benefits</SidebarLink>
                   </SidebarMenu>
                   <SideBtnWrap>
                       
                   </SideBtnWrap>
               </SidebarWrapper>
           </SidebarContainer> 
        </>
    )
}

export default Sidebar
