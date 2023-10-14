import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (_: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
      statusCode: 200,
      body: "Hello World"
    }
}