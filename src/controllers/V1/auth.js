import Db from '../../services/queries'
import ApiKey from '../../models/apikey'

export default class AuthController {
    static async authRequestHeader(headers) {

        // Skip API key verification
        return true

        const { Authorization } = headers;

        if(!Authorization) {
            return false
        }

        try {
            const isExistApiKey = await Db.getData(ApiKey, { api_key: Authorization })

            if(isExistApiKey && isExistApiKey.length > 0) {
                return true
            }
            else {
                return false
            }
        }
        catch (error) {
            throw error
        }
    }
}