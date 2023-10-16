import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const dynamo = new DynamoDBClient({})
const client = DynamoDBDocumentClient.from(dynamo)

export const handler = async (_: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const command = new ScanCommand({
    TableName: "DynamoUsers"
  })

  const response = await client.send(command)
    .then(resp => {
      console.log('Success', resp)
      return resp
    }).catch(err => {
      console.log('Error', err)
      return err
    })

  return {
    statusCode: 200,
    body: response
  }
}