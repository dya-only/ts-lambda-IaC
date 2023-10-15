# users table
resource "aws_dynamodb_table" "dynamo_users" {
  name = "DynamoUsers"
  billing_mode = "PROVISIONED"
  hash_key = "Id"
  read_capacity  = 20
  write_capacity = 20

  attribute {
    name = "Id"
    type = "S"
  }
}