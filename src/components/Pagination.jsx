import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

const Button = ({ className, isSelected, children, disabled, ...props }) => {
    return (
        <button {...props} type="button" disabled={disabled} className={`px-4 py-2 text-[7px] xxs:text-sm font-medium text-blue-600 bg-blue-900 border-t border-b border-blue-700 hover:bg-blue-800 hover:text-blue-200 ${disabled ? "cursor-not-allowed hover:text-blue-600 hover:bg-blue-900 opacity-40" : ''}  ${isSelected ? '!bg-blue-800 !text-blue-200  border-x' : ''} ${className}`}>{children}</button>
    )
}

const Elipsis = () =>
    <Button className="hover:bg-blue-900 hover:text-blue-600 cursor-not-allowed">...</Button>


const MyButton = ({ setPage, pageNo, currentPageNo }) => {
    return (
        <Button data-value={pageNo} isSelected={currentPageNo === pageNo} onClick={setPage}>{pageNo}</Button>
    )
}

const Pagination = ({ pageNo, setPageNo, count }) => {
    const setPage = e => {
        setPageNo(Number(e.target.dataset.value));
    }

    const prevPage = () => setPageNo(p => p - 1);
    const nextPage = () => setPageNo(p => p + 1);
    console.log(pageNo);
    return (
        count < 2 ? (
            null
        ) : (
            <div className="inline-flex rounded-md shadow-sm mt-10" role="group">
                <Button className="rounded-l-lg border-x" disabled={pageNo === 1} onClick={prevPage}>
                    <BiChevronLeft />
                </Button>
                {
                    count < 7 ? (
                        Array(count).fill(0).map((count, i) => (
                            <MyButton key={i} pageNo={i + 1} currentPageNo={pageNo} setPage={setPage} />
                        ))
                    ) :
                        pageNo < 5 ? (
                            <>
                                <MyButton pageNo={1} currentPageNo={pageNo} setPage={setPage} />
                                <MyButton pageNo={2} currentPageNo={pageNo} setPage={setPage} />
                                <MyButton pageNo={3} currentPageNo={pageNo} setPage={setPage} />
                                <MyButton pageNo={4} currentPageNo={pageNo} setPage={setPage} />
                                <MyButton pageNo={5} currentPageNo={pageNo} setPage={setPage} />
                                <Elipsis />
                                <MyButton pageNo={count} currentPageNo={pageNo} setPage={setPage} />
                            </>
                        ) : pageNo > count - 4 ? (
                            <>
                                <MyButton pageNo={1} currentPageNo={pageNo} setPage={setPage} />
                                <Elipsis />
                                <MyButton pageNo={count - 4} currentPageNo={pageNo} setPage={setPage} />
                                <MyButton pageNo={count - 3} currentPageNo={pageNo} setPage={setPage} />
                                <MyButton pageNo={count - 2} currentPageNo={pageNo} setPage={setPage} />
                                <MyButton pageNo={count - 1} currentPageNo={pageNo} setPage={setPage} />
                                <MyButton pageNo={count} currentPageNo={pageNo} setPage={setPage} />
                            </>
                        ) : (
                            <>
                                <MyButton pageNo={1} currentPageNo={pageNo} setPage={setPage} />
                                <Elipsis />
                                <MyButton pageNo={pageNo - 1} currentPageNo={pageNo} setPage={setPage} />
                                <MyButton pageNo={pageNo} currentPageNo={pageNo} setPage={setPage} />
                                <MyButton pageNo={pageNo + 1} currentPageNo={pageNo} setPage={setPage} />
                                <Elipsis />
                                <MyButton pageNo={count} currentPageNo={pageNo} setPage={setPage} />
                            </>
                        )

                }
                <Button className="rounded-r-lg border-x" disabled={pageNo === count} onClick={nextPage}>
                    <BiChevronRight />
                </Button>
            </div>
        )
    )
}

export default Pagination