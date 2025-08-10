import error_page from '../assets/images/error-page.png'

const Error = () => {
    return (
        <div className='w-[100vw] flex justify-center items-center h-[100vh] bg-white'>
            <img src={error_page} alt="error_page" className='w-[45%] object-cover' />
        </div>
    )
}

export default Error;
