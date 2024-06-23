export const PageHeader = ({ left,right }) => {
    return (
        <div className="d-flex align-items-center justify-content-between flex-wrap mb-4">
            {left}
            {right}
        </div>
    )
}