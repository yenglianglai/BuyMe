exports.GetQRCode = async (req, res) =>  {
    console.log(req.query.account)
    const bank = req.query.account.bank_id;
    const account = req.query.account.bankaccount_id;

    const amount = req.query.amount;
    const memo = req.query.memo;
    const redir = req.query.redir;
    
    let str = "";
    if (bank && account) {
        //檢查銀行代碼
        let BankCode = bank.slice(0, 3);
        if (!isNaN(BankCode) && BankCode >= 1 && BankCode.length == 3) {

            //檢查帳號
            let AccNo = account.padStart(16, '0');
            if (!isNaN(AccNo) && AccNo >= 1 && AccNo <= 9999999999999999) {

                //產生QRCode編碼字串
                let QString = `TWQRP%3A%2F%2F${BankCode}NTTransfer%2F158%2F02%2FV1%3FD6%3D${AccNo}%26D5%3D${BankCode}%26D10%3D901`;

                //檢查金額
                if (amount) {
                    //TWPay金額格式包含兩位小數，所以此處數字要乘上100
                    let Amount = amount * 100;
                    //TWPay金額限制最低1.00元，最高9,999,999.00元
                    if (!isNaN(Amount) && Amount <= 999999900 && Amount >= 100) {
                        //於編碼字串上加上金額
                        QString += `%26D1%3D${Amount}`;
                    }
                }

                //檢查備註
                if (memo) {
                    //備註上限為19字元，超過者省略。
                    let Memo = memo.slice(0, 19);
                    //於編碼字串上加上備註
                    QString += `%26D9%3D${Memo}`;
                }

                //資料檢核完成，顯示QRCode
                if (redir) {
                    let Pixel = redir;
                    //Google API產生的QR Code像素大小須介於99~547之間
                    if (!isNaN(Pixel) && Pixel >= 99 && Pixel <= 547) {
                        str = `<center><img src='https://chart.googleapis.com/chart?cht=qr&chs=${Pixel}x${Pixel}&chl=${QString}' /></center>`;
                    } else {
                        //預設像素為400x400
                        str = `<center><img src='https://chart.googleapis.com/chart?cht=qr&chs=400x400&chl=${QString}' /></center>`;
                    }
                } else {
                    //資料檢核完成，回傳JSON String
                    str = `{"Success":"1", "String":"${decodeURI(QString)}", "QR":"https://chart.googleapis.com/chart?cht=qr&chs=400x400&chl=${QString}"}`;
                }
            } else {
                //回傳帳號不合法訊息
                str = `{"Success":"0", "Msg":"Parameters \`Acc\` not legal"}`;
            }
        } else {
            //回傳銀行代碼不合法訊息
            str = `{"Success":"0", "Msg":"Parameters \`Bank\` not legal"}`;
        }
    } else {
        //銀行代碼或帳號值為空，回傳錯誤訊息
        str = `{"Success":"0", "Msg":"Parameters \`Bank\` or \`Acc\` not set"}`;
    }
    res.status(200).send(str);
}
