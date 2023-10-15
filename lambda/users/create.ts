import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { v4 } from 'uuid'

const dynamo = new DynamoDBClient({})
const client = DynamoDBDocumentClient.from(dynamo)

export const handler = async (events: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(events.body!)

  const command = new PutCommand({
    TableName: "DynamoUsers",
    Item: {
      Id: v4,
      Name: body.name,
      Password: body.password
    },
  })

  const response = await client.send(command)
  .then((resp) => {
    console.log('Success', resp)
    return resp
  }).catch(err => {
    console.log('Error', err)
    return err
  })

  return {
    statusCode: 200,
    body: response.toString()
  }
}