interface Props{
    children: React.ReactNode;
}

const Layout=({children}:Props)=>{
    return <div className="bg-[#3e3e42] h-screen ">{children}</div>;
}

export default Layout;