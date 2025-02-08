/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_346498674")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool4057886235",
    "name": "isConfirmed",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool3317775413",
    "name": "isBought",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool963269739",
    "name": "isRead",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool1129937436",
    "name": "isActed",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_346498674")

  // remove field
  collection.fields.removeById("bool4057886235")

  // remove field
  collection.fields.removeById("bool3317775413")

  // remove field
  collection.fields.removeById("bool963269739")

  // remove field
  collection.fields.removeById("bool1129937436")

  return app.save(collection)
})
