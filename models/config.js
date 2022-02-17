const DATABASE = 'ecommerce';

export default {
    mongodb: {
        uri: `mongodb+srv://admin:${process.env.DB_PASSWORD}@coderhouseecommerceclus.ct8zd.mongodb.net/${DATABASE}?retryWrites=true&w=majority`
    },
    firebase: {
        "type": "service_account",
        "project_id": "ecommerce-244c9",
        "private_key_id": "dcc466dffbba2fe8b02b87f2e373c2155e3716bd",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCJTb+FMlufxzPx\nSlXcYr5op89qMVA5jrprWTOgNrVhjJjxcBD7WFfs7PLZba9z1OaStTkM3yjCY+XU\nucbAQL2nmegx/bYHaj+c+WpfvHi3IRmYzsl1DuoLPlDgz/6xjdGpNk/X/lxvgm7v\nOW6SWcIH5ILch7Sa7pJGeP3XYvQ6kb58XxRx0s/N6QDAZ88aaQ3BK+fn3ahz2aii\nLH7p1nc7Rj/lHHe1ApKoqV/ap/1AkQZrvcG8DADB+DI8vMK+UjhTv2F7AXOxqQgY\n3LNZe/s8wNV8WUYlFySQvON/jq44GXSWiP4q2vCgC0AUIH4SN7kRcxZqJ6U+pVCO\nhJ62KNQhAgMBAAECggEALbl/m1ru2mHbcXKA73jO0kl4MHQltFVMza0SHTu64baR\nxG2+qgV8moE6SqBVeqye8KJ7UkcK6tmb02DeyG2G+0as5eEI+qUudBc3jpRUWyAh\nxxquSlZiKMZi5ss9lWGWPdTBeDvUCqqUSQSGRySvEjPORKTIx4PFoMRwPIdOsCYW\nOnWsMSw08kO11HNxRIH0sEJn6AHOKUN88tAHva2xlqhc3ieVIIkxrm6en6djs/Ws\ngLDg/HPSfdW4SIRj90AFYxLI1nKURJvfH2PSiI+VU4utICddyeWlIgYmCrpn/RZE\nQ5ZtbOqb/rGTLoAMRonFS5P2+ZeWbpRpmMsbB6QzlQKBgQC83A6Q36tK4+J1gpmh\noxbRzdxERF2aQJgf2jS+Ra1qfnDgcIN14U+ofxluOA0vcvnNXzWNtAloK7wSF8O8\nP1+9uVDIOftDaf4A8oEQOJfXFTt1GLmLr9p8Shr1KG4yw7L41tlcjybZ5TcVL3zl\nBtJShFGf6soyHpxSS1ALZIZAEwKBgQC6HaKsMUw+TsmVbsAF8A1U8Z70CmtxyMc2\n/5QROjyBkp51y15VACmLxzGZ/OZHt5fZz76S9KKN3rXCxgNgg3mY4112cAgjmRUC\nNWVirmKBmma+E3UmfDADLEjO6AGo9cOK3rn0B0+gDqRt5GDYz9URqNtKHh6XExlg\nowdND6cpewKBgQCp6YmpSbJAdHn/ovo5dBNJut4bBS75Ynf64ERnkySMFSnUoyWC\n3qzeOUtV4FPshpK79Jan4Hw+HmrcFEljidjHRnypR5EJe8isbYE0aNYjCdUuaoo0\nZIg7HijWvAM45NyWCCYSojAgBZrjEpBZNSPwXV9actBq+yNE3sErHsuxxQKBgEHS\nfVe8z6QxpSWOV6dB8NUb5wWUMc+6HIqc9Tbqi7+fpR8v35rcRdVDi41UXfT7P18v\nE81Ra7QVEd9ivIsDtJuXvdRHZvmACGgRjlvKJNiFTNToeMQ1o51bqhxS/VNOJ+wT\nPVzKwSRwSUL8RCwpxMdMGtIpuNPhU1ZUEh707D/FAoGBAJIU+NoFqaKV9ynKxqRp\n/4bD2AYJCB9EsHFhGnq3tbefm9W1Ns2TUNZ4SUmPGz8QJZVKQ/495PeP9R863yVd\nyiXBfUKKnfueypZidoazacB2RM6TJZHTBWGNy9dvCFJ28n8bXHnBNf5+XI27KQs6\nBnsgwxvMuWctJE/TCb3ldIbg\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-jpeic@ecommerce-244c9.iam.gserviceaccount.com",
        "client_id": "107701152549709222816",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jpeic%40ecommerce-244c9.iam.gserviceaccount.com"
    }
}