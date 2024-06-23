import { HeaderBar } from './Header'
import { FooterBar } from './Footer';
import { Layout as AntdLayout } from 'antd'
import styled from 'styled-components'
import { Sidebar } from './Sidebar';

const { Content } = AntdLayout;

const MainLayout = styled(AntdLayout)`
    min-height:100vh;
    display:flex;
    background: ${({ theme }) => theme.colors.colorWhite};

	@media screen and (max-width: 1023px) {
		margin-left: 0px !important;
		padding-bottom: 32px;
	}
`

const MainContent = styled(Content)`
    padding: 32px 52px 32px 32px;

	@media screen and (max-width: 1279px) {
		padding: 32px;
	}

	@media screen and (max-width: 767px) {
		padding: 24px 15px;
	}
`

export function Layout({ children }) {

	return (
		<MainLayout className="layout" hasSider>
			<Sidebar />
			<MainLayout className="site-layout" style={{ marginLeft: 232 }}>
				<HeaderBar />
				<MainContent>
					{children}
				</MainContent>
				<FooterBar />
			</MainLayout>
		</MainLayout>
	)
}
