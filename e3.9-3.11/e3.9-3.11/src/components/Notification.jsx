const Notification = ({ message, isError }) => {
    if (message === null) {
        return null
    }
    
    console.log("isError => " + isError)

    if (isError === true) {
        return (
            <div className="message red">
                {message}
            </div>
        )
    } else {
        return (
            <div className="message green">
                {message}
            </div>
        )
    }
}

export default Notification