import { Modal } from 'antd'

const FulfillModal = ({
    fulfill,
    setFulfill,
    confirmFulfill,
    isSender,
    askForPayMent,
}) => {
    return (
        <Modal
            title="完成訂單"
            open={fulfill}
            onOk={isSender ? () => confirmFulfill() : () => askForPayMent()}
            onCancel={() => {
                setFulfill(false)
            }}
            okText="確認"
            cancelText="取消"
        >
            {isSender ? (
                <p>送出後將導引至付款頁面，請確認您的訂單已經完成。</p>
            ) : (
                <p>訂單已完成，等待付款</p>
            )}
        </Modal>
    )
}
export default FulfillModal
