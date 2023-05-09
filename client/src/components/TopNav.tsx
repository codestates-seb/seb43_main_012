import { Link } from 'react-router-dom';
import styled from 'styled-components';
//상위 내비게이션 컴포넌트

const TopNav = () => {
    return (
        <>
        <span><Link to ='/main'>Main   </Link></span>
        <span><Link to ='/mypage'>MyPage   </Link></span>
        <span><Link to ='/signup'>Signup   </Link></span>
        <span><Link to ='/bookmarks'>Bookmarks   </Link></span>
        </>

    )
}
export default TopNav;