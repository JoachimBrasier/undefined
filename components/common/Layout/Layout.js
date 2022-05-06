import { Footer, Navbar } from 'components/common';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
