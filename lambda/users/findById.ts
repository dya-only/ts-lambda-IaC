import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const dynamo = new DynamoDBClient({})
const client = DynamoDBDocumentClient.from(dynamo)

export const handler = async (events: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { id } = events.pathParameters!

  const command = new GetCommand({
    TableName: "DynamoUsers",
    Key: {
      id
    }
  })

  try {
    const response = await client.send(command)
    
    if(response.Item) {
      console.log('Success', response.Item.name)
      return {
        statusCode: 200,
        body: JSON.stringify(response.Item)
      }
    } else {
      throw new Error('No user found')
    }
    
  } catch(err) {
    console.log('Error', err)
    
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
}