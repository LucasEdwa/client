module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                publicPath: '/assets/', // Updated publicPath to include leading slash
              },
            },
          ],
        },
      ],
    },
  };
