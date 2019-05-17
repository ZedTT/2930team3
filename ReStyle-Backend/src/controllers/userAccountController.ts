import { query, connect } from '../db/dbInit'
import { insert_user_with_return, new_user_hide, get_user, insert_email_contact_details } from '../db/sql_library'
import { Response } from 'express';
import { UserDetailsInterface } from '../models/UserDetailsInterface';

// Initial swap score is hard coded to five
const initialSwapScore = 5;
const defaultProfilePhotoPath = 'defaultAvatar.png'

export function getUser(response: Response, uid: string) {
    query(get_user, [uid], (err, res) => {
        if (err) {
            console.log("Error inside get_user query: ", err)
            response.send({ error: err.message })
        } else {
            if (res.rows.length == 1) {
                const userRecord = res.rows[0];
                response.send({ swapScore: userRecord.swapscore, userName: userRecord.username, userPhotoPath: userRecord.userphotopath })
            } else (
                response.send({ error: `User with uid: ${uid} not found` })
            )
        }
    })
}

// insert the new user into db
// ? Picture path is hardcoded to defaultProfilePhotoPath until user changes it in Edit Profile (to be implemented later)
export function insertNewUser(response: Response, uid: string, userName: string, email: string) {

    connect((err, client, done) => {
        if (err) {
            console.log("Transaction connection error:", err)
            done()
            return
        }
        client.query(insert_user_with_return, [uid, initialSwapScore, userName, defaultProfilePhotoPath], (error, result) => {
            if (error) {
                response.send({ 'error': `User with id: ${uid} already exists.` })
                done()
            } else {
                if (result.rowCount === 1) {
                    client.query(new_user_hide, [uid], (error, result) => {
                        if (error) {
                            done()
                        } else {
                            client.query(insert_email_contact_details, [uid, email], (error, result) => { // add user email
                                if (error) {
                                    done();
                                } else {
                                    response.send(
                                        {
                                            'message':
                                                `New user with id: ${uid} and empty hide array for that user were added.`
                                        })
                                    done()
                                }
                            })
                        }
                    })
                } else {
                    done()
                }
            }
        })
    })
}

export function updateUserDetails(response: Response, userDetails:UserDetailsInterface) {

}

export function getUserDetails(response: Response, uid: string) {
    query(bbb, [uid], (error, result) => {
        if (error) {
            console.log("Error inside getUserDetails query: ", error)
            response.send({ error: error.message })
        } else {
            if (result.rows.length == 1) {
                const userRecord = result.rows[0];
                const userDetailsToSend: UserDetailsInterface = {
                    displayname: userRecord.username,
                    phone: userRecord.phonenumber,
                    email: userRecord.email,
                    postalcode: userRecord.postalcode,
                    city: userRecord.city,
                    preferredContact: userRecord.preferredmethodofcontact,
                    profilePic: userRecord.userphotopath
                }
                response.send(userDetailsToSend)
            } else (
                response.send({ error: `User with uid: ${uid} not found` })
            )
        }
    })
}
