
const countryController={
    AddCountry,
    GetCountryDetails,
    GetCountryById  ,
    updateCountry,
    DeleteAllCountry,
    DeleteCountry
}=require('./countrycontroller/country');

const stateController={
                        AddState,
                        GetStateDetailst,
                        getStateById,
                        updateState,
                        DeleteState,
                        DeleteAllState
                     }= require('./statecontroller/state')
const cityController={
                        AddCity,
                        GetCityDetails,
                        getCityById,
                        updateCity,
                        DeleteCity,
                        DeleteAllCity
                    }= require('./citycontroller/city')
const talukaController={
                            AddTaluka,
                            GetTalukaDetails,
                            getTalukaById,
                            updateTaluka,
                            DeleteTaluka,
                            DeleteAllTaluka
                        }= require('./talukacontroller/taluka')
const roleController={
                        AddRole,
                        GetRoleById,
                        GetRoleDetails,
                        updateRole,
                        DeleteRole,
                        DeleteAllRole
                    }=require('./rolecontroller/role')
const AddAddressbookController= {
                                    AddAddressbook,
                                    getAddressbookById,
                                    GetAddressbookDetails,
                                    updateAddressbook,
                                    DeleteAddressbook,
                                    DeleteAllAddressbook
                                }=require('./addressbookcontroller/addressbook')

const UserController=   {
                            registrationUser,
                            getUserById,
                            GetUserDetails,
                            DeleteUser,
                            DeleteAllUser,
                            updateUser,
                            loginjwt
                        }=require('./usercontroller/user')
module.exports=({
    countryController,
    stateController,
    cityController,
    talukaController,
    roleController,
    AddAddressbookController,
    UserController,
    
})
