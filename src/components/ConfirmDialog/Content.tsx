
interface ConfirmDialogProp {
    action: (confirm: boolean) => void;
    show: boolean;
    dialogMessage?: string
    dialogTitle?: string,
}

export default function ConfirmDialogComponent({action, show, dialogMessage, dialogTitle}: ConfirmDialogProp) {
    const handleConfirm = () => {
        action(true);
    }

    const handleDeny = () => {
        action(false);
    }

    if(!show) {
        return null;
    }

    return(
        <>
            <div 
                className={`modal fade ${show ? "show d-block" : ""}`} 
                id="exampleModal" 
                role="dialog" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden={!show}
            >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{dialogTitle}</h5>
                    <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="modal" 
                    onClick={() => {action(false)}}
                    aria-label="Close">
                    </button>

                </div>
                <div className="modal-body">
                    {dialogMessage}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleDeny}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleConfirm}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}