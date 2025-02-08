/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_346498674")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool1129937436",
    "name": "hasBeenApplied",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_346498674")

  // update field
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
})
