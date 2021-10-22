# Create Model

```nodejs
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,status:boolean
```

#### Change the extension of model file to .ts and change to typescript syntax

# Migrate

```nodejs
npx sequelize-cli db:migrate
```