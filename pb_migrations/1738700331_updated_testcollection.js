/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_346498674")

  // update collection data
  unmarshal({
    "name": "books"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_346498674")

  // update collection data
  unmarshal({
    "name": "testcollection"
  }, collection)

  return app.save(collection)
})
