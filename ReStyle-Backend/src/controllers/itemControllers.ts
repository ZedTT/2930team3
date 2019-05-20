import { query } from "../db/dbInit";
import { insert_item_with_return, get_user_item, get_user_item_data, get_user_items_to_trade, add_hide } from "../db/sql_library";
import { Response } from "express";
import { AddItemModel } from "../models/AddItemModel";
import { ItemCardInterface } from '../models/ItemCardInterface';
import { TradeItemInterface } from '../models/TradeItemInterface';

// insert dummy item to the db
export function dummy_insertItemForUserWithId() {
  query(
    insert_item_with_return,
    [
      "l15CGtMJ5bSnEkRPpYEgyvVWeLt2",
      "description",
      "Female",
      1,
      "title",
      "category",
      ["path1", "path2", "path3"]
    ],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
      } else {
        console.log("Inside insert_item_with_return", res);
      }
    }
  );
}

// insert an item to the db using the user uid
export function insertItemForUserWithId(
  response: Response,
  item: AddItemModel
) {
  if (item.getSize() < 0 || item.getSize() > 4) {
    response.send({
      error:
        "Invalid size. Expected from 0 to 4 included. Actual: " + item.getSize()
    });
  } else {
    query(insert_item_with_return, item.getPropertiesArray(), (err, res) => {
      if (err) {
        console.log("Error:", err);
      } else {
        response.send({ message: "New item was added" });
      }
    });
  }
}

// get all items that are owned by a user with id
export function getItemsForUserWithId(response: Response, userId: string) {
  query(get_user_item, [userId], (err, res) => {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Inside get_user_item", res.rows);
      response.send({ result: res.rows });
    }
  });
}

// get items to display on home page for a user with a specific id who is signed in at the current moment
// if no user is logged in, userId is expected to be null and all items that exist in the database will be returned
export function getItemsToDisplayForUserWithId(response: Response, userId: string) {
  query(get_user_item_data, [userId], (err, res) => {
    if (err) {
      console.log("Error inside getItemsToDisplayForUserWithId:", err);
      response.send({ error: err.message });
    } else {
      // console.log('\nDatabase response: ', res.rows)
      let itemsToSend: ItemCardInterface[] = [];
      for (let itemRecord of res.rows) {
        itemsToSend.push({
          itemId: itemRecord.itemid,
          itemPicturePath: itemRecord.photopaths,
          bookmarked: false, //hardcoded for now, needs another query. Not implemented yet
          userId: itemRecord.userid,
          userName: itemRecord.username,
          userPicturePath: itemRecord.userphotopath,
          userVerified: true, //hardcoded, doesn't exist in db for now. Not implemented yet
          userRating: itemRecord.swapscore,
          title: itemRecord.title,
          size: itemRecord.size,
          category: itemRecord.category,
          description: itemRecord.description
        })
      }
      // console.log('\nitemsToSend: ', itemsToSend)
      response.send(itemsToSend);
    }
  })
}

// to get all items that are owned by a specific user and are eligible for trading
export function getTradeItemsForTheUserWithId(response: Response, userId: string) {
  query(get_user_item, [userId], (err, res) => {
    if (err) {
      console.log("Error inside getTradeItemsForTheUserWithId:", err);
      response.send({ error: err.message });
    } else {
      let itemsToSend: TradeItemInterface[] = [];
      for (let itemRecord of res.rows) {
        itemsToSend.push({
          itemId: itemRecord.itemid,
          picturePath: itemRecord.photopaths,
          title: itemRecord.title,
          description: itemRecord.description,
          size: itemRecord.size,
          category: itemRecord.category
        })
      }
      // console.log('\nitemsToSend: ', itemsToSend)
      response.send(itemsToSend);
    }
  })
}

export function addHiddenItem(response: Response, userId: string, itemId: number) {
  query(add_hide, [itemId, userId], (err, res) => {

  })
}
