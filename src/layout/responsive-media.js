import { useMediaQuery } from "react-responsive"

export const useDesktopMediaQuery = () =>
    useMediaQuery({ query: "(min-width: 1024px)" })

export const useTabletAndBelowMediaQuery = () =>
    useMediaQuery({ query: "(max-width: 1023px)" })

export const DesktopMode = ({ children }) => {
    const isDesktop = useDesktopMediaQuery()

    return isDesktop ? children : null
}

export const MobileMode = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery()

    return isTabletAndBelow ? children : null
}
