import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    StyleSheet,
    CheckBox,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    saveCollection
} from '../../redux/routines';
import { INewMovieList } from './ICollection';
import ImageUploader from '../ImageUploader/index';
import Spinner from '../Spinner/Spinner';

interface IProps {
    navigation: any;
    saveCollection: ({ movieList: INewMovieList }) => void
}

interface IState {
   collection: INewMovieList ,
   loading: boolean
}

class Collection extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            collection: {
                title: '',
                description: '',
                isPrivate: false,
                moviesId: [],
                imageUrl: ''
            },
            loading: false
        }
    }

    onChangeTitle = (value) => {
        this.setState({
            collection: {
                ...this.state.collection,
                title: value
            }
        })
    }

    onChangeDescription = (value) => {
        this.setState({
            collection: {
                ...this.state.collection,
                description: value
            }
        })
    }

    onChangePrivacy = () => {
        this.setState({
            collection: {
                ...this.state.collection,
                isPrivate: !this.state.collection.isPrivate
            }
        });
    }

    onNewMovie = (id) => {
        const movies = this.state.collection.moviesId;
        movies.push(id);
        console.log(movies);
        this.setState({
            collection: {
                ...this.state.collection,
                moviesId: movies
            }
        });
    }

    validate = () => {
        if (!this.state.collection.title.trim() || !this.state.collection.moviesId.length)
        return false;
        return true;
    }

    onSave = () => {
        if (!this.validate()) return;
        this.props.saveCollection({ movieList: this.state.collection} );
        this.props.navigation.navigate('Profile');
    }

    render () {
        const { navigation } = this.props;
        const { title, description, imageUrl, isPrivate } = this.state.collection;
        if (this.state.loading === true) return <Spinner />
        return (
            <View>
                <TextInput 
                    value={title} 
                    onChangeText={this.onChangeTitle} 
                    style={styles.input}
                />
                <TextInput 
                    value={description} 
                    onChangeText={this.onChangeDescription} 
                    style={styles.input}
                />
                <View>
                    <ImageUploader
				    	startUpload={() => this.setState({ loading: true })}
				    	saveUrl={(image_url: string) => {
				    		this.setState({ 
                                collection: {
                                    ...this.state.collection,
                                    imageUrl: image_url
                                }, 
                                loading: false 
                            });
				    	}}
				    >
                        <Text>Image</Text>
                    </ImageUploader>
                    {
                        !!imageUrl &&
                        <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }}/>
                    }
                </View>
                <TouchableOpacity onPress={this.onChangePrivacy}>
                    <CheckBox value={isPrivate} onChange={this.onChangePrivacy} />
                    <Text>private</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { 
                    navigation.navigate('ChooseMovie', { onSave: this.onNewMovie }) 
                }}>
                    <Text>Add movie</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onSave}>
                    <Text>Save collection</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Text>Go back</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (rootState, props) => ({
    ...props,
    loading: rootState.collections.loading,
	collection: rootState.collections.movieListDetails,
});

const actions = {
    saveCollection
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Collection);

const styles = StyleSheet.create({
    input: {
        borderWidth: 1
    },
})